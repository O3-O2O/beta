const UPLOAD_PRESET = "photos"; 
const PROJECT_NAME = "dvj0og4ia"
const URL_CLOUDINARY = `https://api.cloudinary.com/v1_1/${PROJECT_NAME}/image/upload`;

const productForm = document.querySelector("#product-form");

//// Thêm sản phẩm  vào database
productForm.addEventListener("submit", function (event) {
  event.preventDefault();
  
  const productImage = document.getElementById("product_image").files[0]; // Lấy file ảnh

  if (productImage) {
    const formData = new FormData();
    formData.append("file", productImage);
    formData.append("upload_preset", UPLOAD_PRESET);

    fetch(URL_CLOUDINARY, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        db.collection("products")
          .add({
            
            productImg: result.secure_url,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            alert("Tạo sản phẩm thành công!");
            loadProducts();
          })
          .catch((error) => {
            console.error("Error adding product: ", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  }
});


// Hiển thị danh sách sản phẩm
function loadProducts() {
  const productTableBody = document.getElementById("product-list");
  let htmls = "";
  let index = 1;
  db.collection("products")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        htmls += `
                    <tr class="product-item text-center">
                        
                        <td><img src="${product.productImg}" alt="${product.productName}"></td>

                        <td>
                            <button class="btn btn-danger btn-sm btn-delete-product" data-id="${doc.id}"><i class="fa-regular fa-trash-can"></i></button>
                        </td>
                    </tr>
                `;
        index++;
      });
      productTableBody.innerHTML = htmls;

      const btnDeleteProduct = document.querySelectorAll(".btn-delete-product");
      btnDeleteProduct.forEach((btn) => {
        btn.addEventListener("click", () => {
          const productId = btn.getAttribute("data-id");
          deleteProduct(productId);
          loadProducts();
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching products: ", error);
    });
}



// Xóa sản phẩm
function deleteProduct(productId) {
  if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
    db.collection("products")
      .doc(productId)
      .delete()
      .then(() => {
        console.log("Product successfully deleted!");
        loadProducts(); // Tải lại danh sách sản phẩm
      })
      .catch((error) => {
        console.error("Error removing product: ", error);
      });
  }
}

loadProducts();