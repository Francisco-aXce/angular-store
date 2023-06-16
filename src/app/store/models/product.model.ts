interface Group {
  nombre: string;
}

export interface Category extends Group {
  subCategories?: Category[];
}
