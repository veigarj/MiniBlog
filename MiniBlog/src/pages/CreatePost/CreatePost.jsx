import styles from './CreatePost.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const {insertDocument, response} = useInsertDocument("posts")
  
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // zerar erros do Form
    setFormError("")

  //  validar image URL
  try {
    new URL(image)
  } catch (error) {
    setFormError("A imagem precisa ser uma URL")
    
  }

  // criar array de Tags
  const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

  // checar todos os valores
  if (!title || !image || !body || !tags) {
    setFormError("Por favor, preencha todos os campos!")
  }

  if (formError) return;

  insertDocument({
    title,
    image,
    body,
    tagsArray,
    uid: user.uid,
    createdBy: user.displayName
  });

  // redirecionar para a home
 navigate("/") 
}

  return (
    <div className={styles.create_post}>
    <h2>Criar Post</h2>
    <p>Escreva sobre o que quiser e compartilhe o seu conhecimento</p>
    <form onSubmit={handleSubmit}>
      <label>
      <span>Título</span>
      <input type="text" name='title' required placeholder="Pense num bom titulo..."
      onChange={(e) => setTitle(e.target.value)}
      value={title}  />
      </label>
      <label>
      <span>URL da imagem</span>
      <input type="text" name='image' required placeholder="Insira uma imagem que represente seu post..."
      onChange={(e) => setImage(e.target.value)}
      value={image}  />
      </label>
      <label>
      <span>Coneudo</span>
      <textarea name="body" required placeholder='Insira o conteúdo do seu post' onChange={(e) => setBody(e.target.value)} value={body}></textarea>
      </label>
      <label>
      <span>Tags</span>
      <input type="text" name='tags' placeholder="Insira tags que representa seu post..."
      onChange={(e) => setTags(e.target.value)}
      value={tags}  />
      </label>
      
      {/* função de loading */}
      {!response.loading && <button className='btn'>Criar post</button>}
        {response.loading && <button className='btn' disabled>Criando...</button>}
        {/* função de erro  */}
        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
      
    </form>
    </div>
  )
}

export default CreatePost;