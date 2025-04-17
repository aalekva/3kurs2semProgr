import React, { createRef, RefObject, useState } from "react";
import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Text from "../components/Text";
import { toJpeg } from "html-to-image";

const EditPage = () => {
    const [params] = useSearchParams();
    const [count, setCount] = useState(0);

    const memeRef = createRef();

    function handleExport() {
        if (memeRef.current === null) {
            return;
        }

        const options = { 
            quality: 1,
            backgroundColor: "#ffffff",
        };

        toJpeg(memeRef.current as HTMLElement, options)
        .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = "meme.jpeg";
            link.href = dataUrl;
            link.click();
        })
        .catch((error) => {
            console.error("Error explorting image:", error);
        });

    };

    const addText = () => {
        setCount(count + 1);
    };
   
    return (
        <div>
            <div 
                style={{width:"700px", border: "1px solid"}} 
                ref={memeRef as React.RefObject<HTMLDivElement>}
                className="meme mb-5"
            >
                <div>
                    <img src={params.get("url") ?? undefined} width="250px" />
                    {Array (count)
                        .fill(0)
                        .map((e) => (
                            <Text />
                        ))}
                </div>
                <Button onClick={addText}>Add Text</Button>
                <Button variant="success" onClick={handleExport}>
                    Save
                </Button>
                
            </div>
        </div>
    );
};

export default EditPage; 