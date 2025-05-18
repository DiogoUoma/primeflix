import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./filme_info.css";

import api from "../../services/api.js";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "4f27e44422974ff29b634b3d571ac631",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Filme nao encontrado");
          navigate("/", { replace: true });
          return;
        });
    }

    loadFilme();

    return () => {
      console.log("Componente desmontado");
    };
  }, [navigate, id]);

  if (loading) {
    return (
      <div className="film_info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmeSalvo) => filmeSalvo.id === filme.id
    );

    if (hasFilme) {
      toast.warn("Esse filme ja esta cadastrado");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!");
  }

  return (
    <div className="filme_info">
      <h1>{filme.title}</h1>
      <img
        src={`http://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="button_area">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a href={`https://youtube.com/results?search_query=${filme.title}`}>
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Filme;
