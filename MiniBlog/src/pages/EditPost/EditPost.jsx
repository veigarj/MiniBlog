import styles from './EditPost.module.css'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'

const EditPost = () => {
  // get dados da url
  const {id} = useParams();
  // get dos dados do post
  const { document: post } = useFetchDocument('posts', id)


  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  // dados do post no state
  useEffect(() => {
    if(post) {
      setTitle(post.title)
      setImage(post.image)
      setBody(post.body)

      // transformar tags em texto
      const textTags = post.tagsArray.join(',')
      setTags(textTags)
    
    }
  }, [post])

  const { user } = useAuthValue();

  const {updateDocument, response} = useUpdateDocument("posts")
  
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

  const data = {
    title,
    image,
    body,
    tagsArray,
    uid: user.uid,
    createdBy: user.displayName
  };


  updateDocument(id, data);

  // redirecionar para a home
 navigate("/dashboard") 
}

  return (
    <div className={styles.edit_post}>
    {post && (
      <>
      <h2>Editando post: {post.title}</h2>
    <p>Altere os dados do post como desejar</p>
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
      <p className={styles.preview_title}>Preview da imagem atual:</p>
      <img  className={styles.image_preview} src={post.image} alt={post.title}/> 
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
      </>
    )}
    </div>
  )
}

export default EditPost;