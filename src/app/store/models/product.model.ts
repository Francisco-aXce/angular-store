// #region Product

export interface Product {
  destacado: number;
  nombre: string;
  id_producto: number;
  id_subcategoria: number;
  subcategoria?: SubCategory;
  precio: number;
  precio_final?: number;
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

// #region Category

interface Group {
  nombre: string;
}

export interface Category extends Group {
  subCategories?: Category[];
}

export interface SubCategory extends Group {
  id: number;
  id_agrupador: number;
  imagen: string;
  orden: number;
}

// #endregion
