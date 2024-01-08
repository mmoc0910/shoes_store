import { FC } from "react";
import classNames from "../../utils/classNames";
import { ProductType } from "../../type";
import { Link } from "react-router-dom";

interface ProductCardProps {
  containerStyle?: string;
  product: ProductType;
}

const ProductCard: FC<ProductCardProps> = ({
  containerStyle = "",
  product,
}) => {
  const {
    id,
    product_name,
    brand: { name: brand_name },
    color: { name: color_name },
    export_price,
    image_url,
    size: { size_number },
  } = product;
  return (
    <Link
      to={`/product/${id}`}
      className={classNames("col-span-1 space-y-4", containerStyle)}
    >
      <img
        src={image_url}
        alt={product_name}
        className="w-full rounded-lg h-[200px] object-cover"
      />
      <div>
        <div className="flex items-center gap-2 mb-1">
          <p className="border border-primary20 text-primary rounded-xl p-1 leading-none text-xs font-medium">
            {brand_name}
          </p>
          <p className="border border-primary20 text-primary rounded-xl p-1 leading-none text-xs font-medium">
            {color_name}
          </p>
          <p className="border border-primary20 text-primary rounded-xl p-1 leading-none text-xs font-medium">
            size: {size_number}
          </p>
        </div>
        <p className="font-medium">{product_name}</p>
        <p className="font-medium ">${export_price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
