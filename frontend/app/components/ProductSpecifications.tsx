const ProductSpecifications: React.FC<{ features: string[] }> = ({ features }) => {
    return (
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Key Features</h2>
        <ul className="mt-2 list-disc list-inside text-gray-700">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ProductSpecifications;
  