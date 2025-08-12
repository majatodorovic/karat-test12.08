const InventoryInfo = ({ displayComponent, selectedProduct, inventory }) => {
  if (!displayComponent) return <></>;

  return (
    <>
      <h2 className="mt-[1.063rem] text-[#636363] text-[0.688rem]">
        {selectedProduct ? `Status: ${inventory?.status}` : <>&nbsp;</>}
      </h2>

      <h2 className="mt-[1.063rem] text-[#636363] text-[0.688rem]">
        {selectedProduct ? (
          `Količina: ${Number(inventory.amount).toFixed(0) + inventory.unit}`
        ) : (
          <>&nbsp;</>
        )}
      </h2>
    </>
  );
};

export default InventoryInfo;
