using laba89.Contracts;
using laba89.DataAccess;
using laba89.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

[ApiController] // 1. Обязательный атрибут для API-контроллеров
[Route("api/[controller]")] // 2. Определение базового маршрута
[Produces("application/json")] // 3. Указываем, что контроллер возвращает JSON
public class NotesController : ControllerBase
{
    private readonly NotesDbContext _dbContext;

    public NotesController(NotesDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)] // 4. Документируем возможные статус-коды
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create(
        [FromBody] CreateNoteRequest request,
        CancellationToken ct)
    {
        var note = new Note(request.Title, request.Description);

        await _dbContext.Notes.AddAsync(note, ct);
        await _dbContext.SaveChangesAsync(ct);

        return Ok();
    }

    [HttpGet]
    [ProducesResponseType(typeof(GetNotesResponse), StatusCodes.Status200OK)] // 5. Указываем тип возвращаемого значения
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Get(
        [FromQuery] GetNotesRequest request,
        CancellationToken ct)
    {
        var notesQuery = _dbContext.Notes
            .Where(n => string.IsNullOrWhiteSpace(request.Search) ||
                       n.Title.ToLower().Contains(request.Search.ToLower()));

        Expression<Func<Note, object>> selectorKey = request.SortItem?.ToLower() switch
        {
            "date" => note => note.CreatedAt,
            "title" => note => note.Title,
            _ => note => note.Id
        };

        notesQuery = request.SortOrder == "desc"
            ? notesQuery.OrderByDescending(selectorKey)
            : notesQuery.OrderBy(selectorKey);

        var noteDtos = await notesQuery
            .Select(n => new NoteDto(n.Id, n.Title, n.Description, n.CreatedAt))
            .ToListAsync(cancellationToken: ct);

        return Ok(new GetNotesResponse(noteDtos));
    }
}