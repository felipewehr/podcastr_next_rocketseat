// SPA - Single Page Application
// SSR - Server Side Rendering
// SSG - Static Site Generation

import {GetStaticProps} from 'next';
import {api} from '../services/api';

type Episode = {
  episodes: Array<{

  }>
};

type HomeProps = {
  episodes: Episode[];
};

export default function Home(props: HomeProps) {
  // SPA
  // useEffect(() => {
  //   fetch('http://localhost:3333/episodes')
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  // }, [])

  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

// SSR 
// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:3333/episodes')
//   const data = await response.json()
//   return { 
//     props: {
//       episodes: data
//     }
//   }
// }

// SSG - Atualizando dados a cada 8hrs
export const getStaticProps: GetStaticProps = async () => {
  const {data} = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    }
  })

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8,
  }
}