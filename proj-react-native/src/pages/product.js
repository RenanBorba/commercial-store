import React from 'React';
import { WebView } from 'react-native';

// navigation prop
const Product = ({ navigation }) => (
  // visualizador Webview
  <WebView source = {{ uri: navigation.state.params.product.url}} />
);

  Product.navigationOptions =
    ({ navigation }) => ({
      title: navigation.state.params.product.title
    });

export default Product;