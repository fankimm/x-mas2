import "../styles/globals.css";
import type { AppProps } from "next/app";
import styled, { keyframes, css } from "styled-components";
import NoSsr from "../components/NoSsr";
interface ISnowFlake {
  left: number;
  top: number;
  distance: number;
  duration: number;
}
const snowAnim = (props: ISnowFlake) => {
  return keyframes`
  0%{
    opacity:1;
    transform: rotate(0deg);
    top:${props.top}vh;
  }
  100% {
    opacity:0;
    top:${props.top + props.distance}vh;
    transform: rotate(360deg);

  }
`;
};

const SnowFlake = styled.div`
  padding: 3px;
  color: silver;
  position: fixed;
  font-size: 36px;
  transition: 0.3s all;
  animation: ${(props: ISnowFlake) =>
    css`
      ${snowAnim(props)} ${props.duration}s linear infinite
    `};
  left: ${(props) => `${props.left}vw`};
  &:hover {
    cursor: pointer;
    font-size: 30px;
    -webkit-text-stroke: 1px white;
  }
`;
export default function App({ Component, pageProps }: AppProps) {
  const FALKE_AMOUNTS = 30;
  const snowArr = [];
  for (let i = 0; i < FALKE_AMOUNTS; i++) {
    const left = Math.random() * 100;
    const top = 10 - Math.random() * 20;
    const duration = Math.random() * 10 + 15;
    const distance = Math.random() * 80 + 10;
    snowArr.push({
      left,
      top,
      duration,
      distance,
    });
  }
  // if (true) return;
  return (
    <>
      <NoSsr>
        {snowArr.map((item, idx) => {
          return (
            <SnowFlake
              key={`snow_${idx}`}
              left={item.left}
              top={item.top}
              duration={item.duration}
              distance={item.distance}
            >
              *
            </SnowFlake>
          );
        })}
        <Component {...pageProps} />
      </NoSsr>
    </>
  );
}
