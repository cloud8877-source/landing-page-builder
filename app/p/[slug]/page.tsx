import { collection, query, where, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function PublicLandingPage({ params }: PageProps) {
  const { slug } = params;

  try {
    // Fetch page from Firestore by slug
    const pagesRef = collection(db, 'pages');
    const q = query(pagesRef, where('slug', '==', slug), where('status', '==', 'published'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      notFound();
    }

    const pageDoc = querySnapshot.docs[0];
    const pageData = pageDoc.data();

    // Increment view count (non-blocking)
    try {
      await updateDoc(doc(db, 'pages', pageDoc.id), {
        views: increment(1),
      });
    } catch (error) {
      console.error('Failed to increment views:', error);
    }

    // Sanitize HTML content to prevent XSS attacks
    const sanitizedHtmlContent = DOMPurify.sanitize(pageData.htmlContent, {
      ALLOWED_TAGS: [
        'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'a', 'img', 'ul', 'ol', 'li', 'strong', 'em', 'u', 'i', 'b',
        'br', 'hr', 'section', 'article', 'header', 'footer', 'nav',
        'main', 'aside', 'figure', 'figcaption', 'blockquote', 'code',
        'pre', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'button',
        'form', 'input', 'textarea', 'label', 'select', 'option'
      ],
      ALLOWED_ATTR: [
        'href', 'src', 'alt', 'title', 'class', 'id', 'style',
        'width', 'height', 'type', 'name', 'placeholder', 'value',
        'data-*', 'role', 'aria-*'
      ],
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    });

    return (
      <div
        dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
        suppressHydrationWarning
      />
    );
  } catch (error) {
    console.error('Error loading page:', error);
    notFound();
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = params;

  try {
    const pagesRef = collection(db, 'pages');
    const q = query(pagesRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const pageData = querySnapshot.docs[0].data();
      return {
        title: pageData.title || 'Property Listing',
        description: pageData.data?.description || 'View this property listing',
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  return {
    title: 'Property Listing',
  };
}
