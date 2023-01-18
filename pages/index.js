import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import Header from "../src/components/Header";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
    return (
        <>
            <CSSReset/>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu></Menu>
                <Header></Header>
                <Timeline playlists={config.playlists}></Timeline>
            </div>
        </>
    )
}

export default HomePage

function Timeline(props) {
    const playlistNames = Object.keys(props.playlists);
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const video = props.playlists[playlistName];
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {
                                video.map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb}></img>
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}