export interface Post {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
    author?: Array<{
      name: string;
    }>;
  };
}

export interface Term {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export async function getPosts() {
  try {
    const response = await fetch(
      'https://sejarelevante.fdc.org.br/wp-json/wp/v2/posts?_embed&per_page=3'
    );
    const posts = await response.json();
    return posts as Post[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(id: number) {
  try {
    const response = await fetch(
      `https://sejarelevante.fdc.org.br/wp-json/wp/v2/posts/${id}?_embed`
    );
    const post = await response.json();
    return post as Post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function getPostsByCategory(categoryId: number) {
  try {
    const response = await fetch(
      `https://sejarelevante.fdc.org.br/wp-json/wp/v2/posts?_embed&categories=${categoryId}&per_page=9`
    );
    const posts = await response.json();
    return posts as Post[];
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

export async function getPostsByTag(tagId: number) {
  try {
    const response = await fetch(
      `https://sejarelevante.fdc.org.br/wp-json/wp/v2/posts?_embed&tags=${tagId}&per_page=9`
    );
    const posts = await response.json();
    return posts as Post[];
  } catch (error) {
    console.error('Error fetching posts by tag:', error);
    return [];
  }
}

export async function getCategory(slug: string) {
  try {
    const response = await fetch(
      `https://sejarelevante.fdc.org.br/wp-json/wp/v2/categories?slug=${slug}`
    );
    const categories = await response.json();
    return categories[0] as Term;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

export async function getTag(slug: string) {
  try {
    const response = await fetch(
      `https://sejarelevante.fdc.org.br/wp-json/wp/v2/tags?slug=${slug}`
    );
    const tags = await response.json();
    return tags[0] as Term;
  } catch (error) {
    console.error('Error fetching tag:', error);
    return null;
  }
}