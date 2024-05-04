// export const handlePrint = (printContent) => {
//   // Create a temporary div element
//   const tempElement = document.createElement("div");
//   tempElement.innerHTML = printContent;

//   // Append the temporary element to the body
//   document.body.appendChild(tempElement);

//   // Print the temporary element
//   window.print();

//   // Remove the temporary element from the body
//   document.body.removeChild(tempElement);
// };

// We didn't use
export const handlePrint = (printContent) => {
  const originalContent = document.body.innerHTML;
  document.body.innerHTML = printContent;
  window.print();

  // Restore the original document body
  document.body.innerHTML = originalContent;

  window.location.reload();
};
