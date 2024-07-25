import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define the createArticle function
const createArticleRequest = async (values) => {
  console.log("createArticleRequest", { values });

  const { data } = await axios.post(
    `http://localhost:3001/api/articles`,
    { article: { ...values } } // Adjust as necessary based on API
  );

  console.log("createArticleResult", { data });

  return data;
};

// Define the custom hook
export default function useCreateArticle() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Use the mutation hook
  const { mutate: createArticle, isLoading: isCreating } = useMutation({
    mutationFn: createArticleRequest,
    onSuccess: () => {
      alert("New post successfully created");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      navigate('/');
    },
    onError: (err) => alert(err.message),
  });

  // Return the mutation function and loading state
  return { isCreating, createArticle };
}
