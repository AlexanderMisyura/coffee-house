generateProductTabs();

const refreshBtn = document.querySelector(".products__refresh-icon");
refreshBtn.addEventListener("click", (e) => {
  refreshBtn.classList.add("products__refresh-icon_fetch-made");
  const subloadedCards = document.querySelectorAll(".card_subloaded");
  subloadedCards.forEach((card) => card.classList.remove("card_hidden"));
});

window.addEventListener("resize", (e) => {
  if (document.documentElement.clientWidth > 768) {
    refreshBtn.classList.remove("products__refresh-icon_fetch-made");
    const subloadedCards = document.querySelectorAll(".card_subloaded");
    subloadedCards.forEach((card) => card.classList.add("card_hidden"));
  }
});

async function generateProductTabs() {
  const categories = await getCategories();
  async function getCategories() {
    const products = await fetch("../products.json").then((res) => res.json());
    const categoriesObj = products
      .map((product) => ({
        [product.category]: product.category_icon_path,
      }))
      .reduce((acc, curr) => {
        Object.keys(curr).forEach((key) => {
          if (!acc[key]) {
            acc[key] = curr[key];
          }
        });
        return acc;
      }, {});
    return categoriesObj;
  }

  const tabsContainer = document.querySelector(
    ".products__switchers.tabs__switchers"
  );
  generateTabSwitchers(tabsContainer, categories);

  const productsContainer = document.querySelector(".products__tab");
  generateProductsTiles(productsContainer, Object.keys(categories)[0]);
}

function generateTabSwitchers(container, categories) {
  Object.entries(categories).forEach((info, i) => {
    const button = createTabSwitcher(info, i);
    container.append(button);

    function createTabSwitcher([category, iconPath], position) {
      const tabSwitcher = document.createElement("button");
      tabSwitcher.classList.add("tab-button");
      if (position === 0) {
        tabSwitcher.classList.add("tab-button_active");
      }
      tabSwitcher.dataset.category = category;
      tabSwitcher.innerHTML = `<span class="tab-button__icon"
                    ><img src="${iconPath}"
                  ></span>
                  <span class="tab-button__text">${
                    category[0].toUpperCase() + category.slice(1)
                  }</span>`;

      return tabSwitcher;
    }
  });

  container.addEventListener("click", switchTab);
  function switchTab(e) {
    const button = e.target.closest(".tab-button:not(.tab-button_active)");
    if (!button) return;

    const currentActiveButton = container.querySelector(".tab-button_active");
    currentActiveButton.classList.remove("tab-button_active");
    button.classList.add("tab-button_active");
    const category = button.dataset.category;

    const productsContainer = document.querySelector(".products__tab");
    generateProductsTiles(productsContainer, category);
  }
}

async function generateProductsTiles(productsContainer, category) {
  productsContainer.innerHTML = "";
  const refreshBtn = document.querySelector(".products__refresh-icon");
  refreshBtn.classList.remove(
    "products__refresh-icon_no-fetch",
    "products__refresh-icon_fetch-made"
  );

  const products = await fetch("../products.json").then((res) => res.json());
  let filteredProducts = products.filter(
    (product) => product.category === category
  );

  filteredProducts.forEach((product, i) => {
    const card = createProductCard(product, i);
    productsContainer.append(card);
  });
  function createProductCard(product, position) {
    const card = document.createElement("div");
    card.classList.add("card", "scale__trigger");
    if (position > 3) {
      card.classList.add("card_hidden", "card_subloaded");
    }
    card.dataset.id = `${product.id}`;
    card.innerHTML = `<div class="card__image scale__container">
                  <img
                    class="scale__target"
                    src=${product.img_src}
                    alt=${product.name}"
                  >
                </div>
                <div class="card__description">
                  <div class="card__title">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                  </div>
                  <h3 class="product-price">$${product.price}</h3>
                </div>`;

    return card;
  }

  if (filteredProducts[0].total_in_category <= 4) {
    const refreshBtn = document.querySelector(".products__refresh-icon");
    refreshBtn.classList.add("products__refresh-icon_no-fetch");
  }

  // productsContainer.addEventListener("click", openCard);

  // function openCard() {
  //   // create modal
  //   // create backdrop
  //   // block scroll
  // }
}
