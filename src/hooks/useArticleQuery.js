import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const getArticleBySlug = async (slug) => {
    try {
        const { data } = await axios.get(`http://localhost:3001/api/articles/${slug}`);
        console.log("getArticleBySlug", { data });
        return data;
    } catch (error) {
        console.error('Error fetching article:', error);
        throw error;
    }
};

function useArticleQuery() {
    const { slug } = useParams();
    console.log('slug', { slug });

    const {
        isLoading: isArticleLoading,
        data: article,
        error: ArticleError,
    } = useQuery({
        queryKey: ["slugArticle", slug],
        queryFn: () => getArticleBySlug(slug),
        refetchOnWindowFocus: true,
        staleTime: 0,
        cacheTime: 0,
    });

    return {
        isArticleLoading,
        article,
        ArticleError,
    };
}

export default useArticleQuery;
