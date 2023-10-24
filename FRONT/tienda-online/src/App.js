import { RoutesApp } from "./Routes/RoutesApp";
import { AuthProvider } from "./authContext/authContext";
import { CartProvider } from "./cartContext/cartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RoutesApp />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
