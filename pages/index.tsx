/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
interface IMessage {
  message: string;
  shape: number;
}
interface ICurrentLeaf {
  colIdx: number;
  rowIdx: number;
}
interface IForm {
  input: string;
}
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "asdf_url";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_KEY ||
  process.env.SUPABASE_KEY ||
  "asdf_key";
const supabase = createClient(supabaseUrl, supabaseKey);
const getTreeData = async () => {
  const res = await supabase
    .from("messages_public")
    .select("shape,rowIdx,colIdx");
  return res;
};
const getMessages = async () => {
  const res = await supabase.from("messages_public").select("shape,message");
  return res;
};
const Input = styled.div`
  ${(props: { visible: boolean }) => {
    if (!props.visible) {
      return `display:none`;
    } else {
      return `
        display:flex;
      `;
    }
  }}
`;
const Leaf = styled.div`
  ${(props) => {
    if (props.children === "*") {
      return `
        font-size:50px;
        width: 10px;
        height: 20px;
        padding: 4px;
        display: flex;
        color: ${props.color};
        justify-content: center;
        align-items: center;
        &:hover{
          transition:0.3s all;
          cursor:pointer;
          font-size:70px;
          -webkit-text-stroke: 2px #ffdc73;
        }
  `;
    } else {
      return `
        width: 10px;
        height: 20px;
        padding: 4px;
        display: flex;
        color: ${props.color};
        justify-content: center;
        transition:0.3s all;
        align-items: center;`;
    }
  }}
  &:hover {
    ${(props) => {
      if (props.children === "^") {
        return `  background: rgb(3, 120, 20);
    border-radius: 10px;
    cursor: pointer;`;
      }
    }}
  }
`;
export default function Home() {
  const now = new Date();
  const holiday = new Date("2022-12-25");
  const postMessage = async () => {
    const shape = Math.floor(Math.random() * 4) + 4;
    const { error } = await supabase.from("messages_public").insert({
      message: form?.input,
      shape,
      colIdx: currentLeafPos?.colIdx,
      rowIdx: currentLeafPos?.rowIdx,
    });
    if (!error) {
      updateTree();
    }
    setForm({ input: "" });
    setInputVisible(false);
  };
  const updateTree = () => {
    getTreeData().then((res) => {
      const { data } = res;
      const temp = [...tree];
      data?.forEach((item) => {
        const { rowIdx, colIdx, shape } = item;
        temp[rowIdx][colIdx] = shape;
      });
      setTree(temp);
    });
    getMessages().then((res) => {
      const { data } = res;
      setMessages(
        data?.map((item) => {
          const { message, shape } = item;
          return {
            message,
            shape,
          };
        })
      );
    });
  };
  useEffect(() => {
    updateTree();
    const colorChangeTimer = setInterval(() => {
      const temp = [...tree];
      setTree(temp);
    }, 2000);
    return () => {
      clearInterval(colorChangeTimer);
    };
  }, []);
  const START = 1;
  const END = 38;
  let treeMap: number[][] = [];
  for (let i = 0; i <= END / 2; i++) {
    treeMap.push([]);
  }
  for (let i = START; i < END; i += 2) {
    let mok = Math.floor(i / 2) + 1;
    for (let j = 0; j < (END - i) / 2; j++) {
      treeMap[mok].push(0);
    }

    for (let j = 0; j < i; j++) {
      if (i === 1) {
        treeMap[mok].push(1);
      } else {
        treeMap[mok].push(2);
      }
    }
  }
  const base: number[] = [];
  for (let i = 0; i < END / 2; i++) {
    base.push(0);
  }
  base.push(3);
  base.push(3);
  for (let i = 0; i < 4; i++) {
    treeMap.push(base);
  }
  const inputRef = useRef<HTMLInputElement>(null);
  const [tree, setTree] = useState(treeMap);
  const [inputVisible, setInputVisible] = useState(false);
  const [currentLeafPos, setCurrentLeafPos] = useState<ICurrentLeaf>();
  const [form, setForm] = useState<IForm>();
  const [messages, setMessages] = useState<IMessage[]>();
  const mapRender = (val: number) => {
    switch (val) {
      case 0:
        return " ";
      case 1:
        return "*";
      case 2:
        return "^";
      case 3:
        return "|";
      case 4:
        return "o";
      case 5:
        return "#";
      case 6:
        return "&";
      case 7:
        return "@";
      case 8:
        return "+";
    }
  };
  const makeRandomColor = (val: number) => {
    switch (val) {
      case 0:
        return "silver";
      case 1:
        return "red";
      case 2:
        return "blue";
      case 3:
        return "gold";
      case 4:
        return "orange";
      case 5:
        return "purple";
    }
  };
  const mapColorRender = (val: number) => {
    switch (val) {
      case 0:
        return;
      case 1:
        return "gold";
      case 2:
        return "rgb(0,179,61)";
      case 3:
        return "rgb(109,83,62)";
      default:
        const color = makeRandomColor(Math.floor(Math.random() * 5));
        return color;
    }
  };
  return (
    <>
      <Head>
        <title>HOLIDAY</title>
        <meta name="description" content="Merry Christmas!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div style={{ margin: "30px" }}></div>
        <div
          style={{
            width: "500px",
            borderRadius: "20px",
            padding: "20px",
            // color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="message"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "60px",
              fontSize: "14px",
            }}
          >
            <h1>🎄 MERRY CRHISTMAS 🎄</h1>
            <h2>AND</h2>
            <h1>HAPPY NEW YEAR</h1>
          </div>
          <div
            className="tree"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginBottom: "80px",
            }}
          >
            {tree.map((row, rowIdx) => {
              const rowKey = `row_${rowIdx}`;
              return (
                <div
                  key={rowKey}
                  style={{
                    display: "flex",
                  }}
                >
                  {row.map((col, colIdx) => {
                    const colKey = `col_${colIdx}`;
                    return (
                      <Leaf
                        key={colKey}
                        color={mapColorRender(col)}
                        onClick={async () => {
                          if (col === 2) {
                            setInputVisible(true);
                            setCurrentLeafPos({ rowIdx, colIdx });
                            inputRef &&
                              inputRef.current &&
                              inputRef.current.focus();
                            return;
                          }
                        }}
                      >
                        {mapRender(col)}
                      </Leaf>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div
            style={{
              height: "30vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Input visible={inputVisible}>
              <input
                value={form?.input || ""}
                onChange={(e) => {
                  setForm({ input: e.target.value });
                }}
                ref={inputRef}
                style={{ marginRight: "10px", marginBottom: "10px" }}
              ></input>
              <button
                style={{ fontSize: "16px" }}
                onClick={() => {
                  if (form?.input) {
                    postMessage();
                  }
                }}
              >
                🛷
              </button>
            </Input>
            {now < holiday && (
              <div
                style={{
                  fontSize: "12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>빈 트리를 눌러 메시지를 작성해주세요</div>
                <div>덕담 좋습니다</div>
                <div>새해인사 좋습니다</div>
                <div>고마운 분들께 감사 인사를 전해요</div>
                <h3 style={{ margin: "70px" }}>
                  메시지는 12월 25일에 공개됩니다 🎅
                </h3>
              </div>
            )}
          </div>
          {now >= holiday && (
            <>
              <div style={{ fontSize: "100px" }}>🎁</div>
              <div className={styles.messages}>
                {messages?.map((item, messageIdx) => {
                  return (
                    <p key={`message_${messageIdx}`}>
                      <span
                        style={{
                          color: mapColorRender(item.shape),
                          marginRight: "10px",
                        }}
                      >
                        {mapRender(item.shape)}
                      </span>
                      <span>{item.message}</span>
                    </p>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <footer style={{ marginBottom: "40px" }}>
          Copyright © 2022 Kim Jihwan. All rights reserved.
        </footer>
      </div>
    </>
  );
}
