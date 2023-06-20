// #region Product

export enum Filters {
  SUBCATEGORY = 'subCate',
  SEARCH = 'search',
}

export enum SortOptions {
  NONE = 'Sin orden',
  FEATURED = 'Destacado',
  PRICE_ASC = 'Menor precio',
  PRICE_DESC = 'Mayor precio',
}

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

export interface Category {
  nombre: string;
  id: number;
  subCategories?: SubCategory[];
}

export interface SubCategory {
  nombre: string;
  id: number;
  id_agrupador: number;
  imagen: string;
  orden: number;
}

// #endregion
