import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  IconButton,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './SimilarProducts.css';

const GET_PRODUCTS = gql`
  query Products {
    products {
      id
      name
      productImage {
        publicUrl
      }
      productPrice
    }
  }
`;

function SimilarProducts({ currentProductId }) {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const [startIndex, setStartIndex] = useState(0);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading similar products</Typography>;

  const similarProducts = data.products.filter(product => product.id !== currentProductId);

  const handlePrevClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (startIndex < similarProducts.length - 4) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="similar-products-carousel">
      <IconButton onClick={handlePrevClick} disabled={startIndex === 0}>
        <ArrowBackIosIcon />
      </IconButton>
      <div className="similar-products-container">
        {similarProducts.slice(startIndex, startIndex + 4).map(product => (
          <Card key={product.id} className="similar-product-card">
            <Link to={`/ProductDetail/${product.id}`} className="similar-product-link">
              <CardMedia
                component="img"
                image={product.productImage?.publicUrl}
                alt={product.name}
                className="similar-product-image"
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">{product.productPrice.toLocaleString("vi-VN")}đ</Typography>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
      <IconButton onClick={handleNextClick} disabled={startIndex >= similarProducts.length - 4}>
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
}

export default SimilarProducts;
