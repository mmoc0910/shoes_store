export type ProductType = {
  id: number;
  product_name: string;
  import_price: number;
  export_price: number;
  product_description: string;
  image_url: string;
  quantity: number;
  create_at: Date;
  update_at: Date;
  product_category: { category: CategoryType }[];
  brand: BrandType;
  color: ColorType;
  size: {
    id: number;
    size_number: number;
  };
};

export type PaymentType = {
  id: number;
  method_name: string;
};

export type CartType = {
  id: number;
  productName: string;
  price: number;
  total: number;
  accountId: number;
  productId: number;
  quantity: number;
  image: string;
};

export type BrandType = {
  id: number;
  index: number;
  name: string;
  description: string;
};

export type ColorType = {
  id: number;
  index: number;
  name: string;
  description: string;
};

export type CategoryType = {
  id: number;
  index: number;
  name: string;
  description: string;
};
