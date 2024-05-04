export const handlePrint = (printContent) => {
  const originalContent = document.body.innerHTML;
  document.body.innerHTML = printContent;

  console.log(window);
  window.print();

  // Restore the original document body
  document.body.innerHTML = originalContent;

  window.location.reload();
};
