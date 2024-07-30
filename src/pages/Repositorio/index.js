
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Container, Owner, Loading, BackButton, IssuesList, PageActions} from './styles';
import api from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";

export default function Repositorio(){
    const {repositorio} = useParams();

    const [repo, setRepo] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() =>{
        async function load(){
            const nomeRepo = decodeURIComponent(repositorio);

            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`,{
                    params:{
                        state: 'open',
                        per_page: 5
                    }
                })
            ]);

            setRepo(repositorioData.data);
            setIssues(issuesData.data);
            setLoading(false);
        }

        load();
    }, [repositorio]);

    useEffect(() => {
        async function loadIssue(){
            const nomeRepo = decodeURIComponent(repositorio);

            const response = await api.get(`/repos/${nomeRepo}/issues`, {
                params:{
                    state: 'open',
                    page,
                    per_page: 5,
                },
            });

            setIssues(response.data);
        }

        loadIssue();

    }, [repositorio, page]);

    function handlePage(action){
        setPage(action === 'back' ? page - 1 : page + 1)
    }

    if(loading){
        return(
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }

    return(
        <Container>
            <BackButton to="/">
                <FaArrowLeft color="#000" size={30}/>
            </BackButton>
            <Owner>
                <img src={repo.owner.avatar_url}
                alt={repo.owner.login}
                />
                <h1>{repo.name}</h1>
                <p>{repo.description}</p>
            </Owner>

            <IssuesList>
               {issues.map(issue =>(
                <li key={String(issue.id)}>
                    <img src={issue.user.avatar_url} alt={issue.user.login}/>

                    <div>
                        <strong>
                            <a href={issue.html_url}>{issue.title}</a>

                            {issue.labels.map(label => (
                                <span key={String(label.id)}>{label.name}</span>
                            ))}

                        </strong>

                        <p>{issue.user.login}</p>
                    </div>
                </li>
               ))} 
            </IssuesList>

            <PageActions>
               <button type="button" 
               onClick={() => handlePage('back')}
               disabled={page < 2}
               >
                Voltar
                </button>

               <button type="button" onClick={() => handlePage('next')}>
                Próxima
                </button>
            </PageActions>

        </Container>
    )
}