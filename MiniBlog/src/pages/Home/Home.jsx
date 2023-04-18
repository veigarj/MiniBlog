import styles from './Home.module.css'

// hooks
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useFetcDocuments } from '../../hooks/useFetchDocuments';
import PostDetail from '../../components/PostDetail'

// components


const Home = () => {
  const [query, setQuery] = useState('');
  const {documents: posts, loading } = useFetcDocuments('posts');

  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(query) {
      return Navigate(`/search?q=${query}`)
    }
  };


  return (
    <div className={styles.home}>
      <h1>Veja nossos posts mais recentes</h1>
      {/* form de pesquisa */}
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>

      <div className="post-list">
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => (
          <PostDetail key={post.id} post={post} />
        ))}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
    
  )}

export default Home