import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { createWorker } from "tesseract.js";

const OcrComponent = () => {
  const [src, setSrc] = useState<string | undefined>(undefined);
  const [result, setResult] = useState<string>("");
  const worker = createWorker();

  const Container = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const ContentWrap = styled.div`
    width: 100%;
    max-width: 1000px;
    padding: 0 10px;
  `;

  const InputArea = styled.div`
    margin-bottom: 4%;
  `;

  const ImageWrap = styled.div`
    position: relative;
    border: 2px solid #6495ed;
    padding: 4%;
    height: 40vh;
    margin-bottom: 4%;
    background: #f8f8ff;
  `;

  const OutputText = styled.textarea`
    min-height: 20vh;
    width: 100%;
  `;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setSrc(() => e.target!.result as string);
      recognize(e.target!.result as string);
    };
    reader.readAsDataURL(file);
  };

  const recognize = async (img: string) => {
    await (await worker).load();
    await (await worker).loadLanguage("jpn");
    await (await worker).initialize("jpn");
    const result = await (await worker).recognize(img);
    const text = result.data.text;
    setResult(() => text);
    await (await worker).terminate();
  };

  return (
    <Container>
      <ContentWrap>
        <InputArea>
          <input type="file" onChange={onChange} />
        </InputArea>
        <div className="output-area">
          <ImageWrap>
            <img
              alt=""
              src={src}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                margin: "auto",
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </ImageWrap>
          <OutputText>{result}</OutputText>
        </div>
      </ContentWrap>
    </Container>
  );
};

export default OcrComponent;
