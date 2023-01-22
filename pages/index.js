import React from "react";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import Header from "../src/components/Header";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";



function HomePage() {
    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});

    React.useEffect(() => {
        service.getAllVideos()
            .then((resultset) => {
                const dados = resultset.data;
                const novasPlaylists = { ...playlists };
                dados.forEach((video) => {
                    if (!novasPlaylists[video.playlist]) {
                        novasPlaylists[video.playlist] = [];
                    }
                    // Adiciona à lista somente se ainda não existir
                    let key = Object.keys(video)[0];
                    let found = novasPlaylists[video.playlist].find(item => item[key] === video[key]);
                    if (!found) {
                        novasPlaylists[video.playlist].push(video);
                    }
                })
                setPlaylists(novasPlaylists);
            });

    }, []);

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}></Menu>
                <Header></Header>
                <Timeline searchValue={valorDoFiltro} playlists={playlists}></Timeline>
            </div>
        </>
    )
}

export default HomePage

function Timeline({ searchValue, ...props }) {
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
                                video.filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                }).map((video) => {
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