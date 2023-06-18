// #region Product

export interface Product {
  destacado: number;
  nombre: string;
  id_producto: number;
  id_subcategoria: number;
  precio: number;
  imagenes: ProductImage[];
  vendible: number;
  stock: number;
  garantia: number;
  iva: number;
}

interface ProductImage {
  nombre: string;
  id_producto_imagen: number;
  orden: number;
}

// #endregion

interface Group {
  nombre: string;
}

export interface Category extends Group {
  subCategories?: Category[];
}
