import { useReducer, useEffect} from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SearchBox from '../components/SearchBox'


function HomeScreen() {

  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, products: action.payload, loading: false };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };


  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://rwashopbackend.onrender.com/api/products', {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        });
        if(result){
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (err) {
        console.log(err)
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        <SearchBox />
      <Helmet>
        <title>RwaShop</title>
      </Helmet>
      <h1>Featured Products</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">
          {error}
        </MessageBox>
      ) : (                    
        <div className="products">
          <Row>
          {Array.isArray(products) && products.map((product) => (
            
            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3 ">
            <Product product={product} />
            </Col>
            
          ))}
          </Row>
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
