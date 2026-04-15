export default function CardItem() {
  return (
    <div className="flex flex-col items-center gap-3 p-5 bg-white rounded shadow">
      {/* <img
        src="/assets/images/placeholder.png"
        alt="Product Image"
        className="w-full h-48 object-cover rounded"
      /> */}
      <h3 className="text-lg font-semibold">Product Title</h3>
      <p className="text-gray-600">$19.99</p>
    </div>
  );
}
