import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import MenuBar from "./MenuBar";
import MenuDialog from "./MenuDialog";
import { apiGetmtl } from "../../api";
import img1 from "../../assets/item1.jpeg";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { useQuery, gql } from "@apollo/client";
import { useSelector } from "react-redux";

Menu.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  setIsDialogOpen: PropTypes.func.isRequired,
};

function Menu({ isDialogOpen, setIsDialogOpen }) {

  // Add PropTypes validation
  const [menu, setMenu] = useState([]);
  const category = menu.map((item) => {
    return {
      keyName: item.categoryName,
      displayName: item.categoryDisplayName,
    };
  });

  const GET_MENU = gql`
    query GetMenu($merchantId: ID!) {
      getMenu(merchantId: $merchantId) {
        menuId
        menuName
        menuDescription
        categories {
          categoryId
          categoryName
          categoryDisplayName
          categoryDescription
          products {
            productId
            productName
            productDisplayName
            productDescription
            price
            status
            attributes {
              attributeId
              attributeName
              attributeDisplayName
              attributeDescription
              status
              options {
                optionId
                optionName
                optionDisplayName
                optionDescription
                price
                status
              }
            }
          }
        }
      }
    }
  `;

  const merchantId = useSelector((state) => state.merchant?.merchantInfo?.id);

  const { loading, error, data } = useQuery(GET_MENU, {
    variables: { merchantId },
    skip: !merchantId,
  });
  useEffect(() => {
    if (data) {
      setMenu(data.getMenu[0].categories);
    }
  }, [data])
  //   const res = useEffect(() => {
  //     async function fetchData() {
  //       await apiGetmtl().then((res) => {
  //         const newMenu = [
  //           {
  //             id: 1,
  //             category: "summer",
  //             categoryName: "夏天系列",
  //             products: res.data.summer,
  //           },
  //           {
  //             id: 2,
  //             category: "winter",
  //             categoryName: "冬天系列",
  //             products: res.data.winter,
  //           },
  //         ];
  //         setMenu(newMenu);
  //         setMtl(res.data.mtl);
  //       });
  //     }
  //     fetchData();
  //   }, []);

  /////////////////////////////

  const productsList = (products) => {
    const filterOnSupply = products.filter((item) => item.status === true);
    return filterOnSupply.map((item) => {
      const itemInfo = `$${item.price} ${item.productDescription}`;
      return (
        <button
          onClick={() => handleClick(item)}
          key={item.productId}
          className="w-full py-3"
        >
          <div className="flex justify-between gap-2">
            <div className=" flex-grow">
              <div className="flex flex-col items-start">
                <span className=" font-medium text-lg text-left">{item.productDisplayName}</span>
                <span className=" font-normal text-sm text-left">{itemInfo}</span>
              </div>
            </div>
            <div className="w-[120px] shrink-0">
              <img src={img1} alt="" className="w-full rounded-lg" />
            </div>
          </div>
        </button>
      );
    });
  };
  const menuListRef = useRef(null);
  function getMenuListMap() {
    if (!menuListRef.current) {
      // Initialize the Map on first usage.
      menuListRef.current = new Map();
    }
    return menuListRef.current;
  }
  const menuList = menu.map((item) => {
    return (
      <div
        key={item.categoryId}
        className="flex flex-col gap-2 menuList"
        data-category={item.categoryName}
        ref={(node) => {
          const map = getMenuListMap();
          if (node) {
            map.set(item.categoryName, {
              ...map.get(item.categoryName),
              node: node,
            });
          } else {
            map.delete(item.id);
          }
        }}
      >
        <div className="my-1 flex items-baseline gap-2 ">
          <span className=" text-2xl font-medium">{item.categoryDisplayName}</span>
          <div className=" grow bg-black h-[2px]"></div>
        </div>
        <div className="flex flex-col my-4 divide-y-[2px] divide-solid">
          {productsList(item.products)}
        </div>
      </div>
    );
  });
  const [currentCategory, setCurrentCategory] = useState();
  useEffect(() => {
    const category = menu.map((item) => {
      return {
        category: item.category,
        categoryName: item.categoryName,
      };
    });
    setCurrentCategory(category[0]);

    // hanndle observe category in vewport

    const targets = document.querySelectorAll(".menuList");
    if (targets.length) {
      targets.forEach((target) => observer.observe(target));
    }
    return () => {
      observer.disconnect();
    };
  }, [menu]);

  const handleClickCategory = (category) => {
    setCurrentCategory(category);
    const map = getMenuListMap();
    const node = map.get(category.keyName).node;
    node.scrollIntoView({ behavior: "smooth" });
  };

  const observer = new IntersectionObserver((entries) => {
    const map = getMenuListMap();
    function handleCurrentCategory() {
      // find the last category in viewport and set it as current category
      const newArray = Array.from(map);
      let newCategory = newArray.findLast(
        (item) => item[1]?.isInViewport === true
      )[0];
      const newCurrentCategory = category.find(
        (item) => item.keyName === newCategory
      );
      setCurrentCategory(newCurrentCategory);
    }
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // if the element is in viewport or entering the viewport
        const targetCategory = entry.target.attributes["data-category"].value;
        map.set(targetCategory, {
          ...map.get(targetCategory),
          isInViewport: true,
        });
        handleCurrentCategory();
      } else {
        // if the element is not in viewport or leaving the viewport
        const targetCategory = entry.target.attributes["data-category"].value;
        map.set(targetCategory, {
          ...map.get(targetCategory),
          isInViewport: false,
        });
        handleCurrentCategory();
      }
    });
  });

  const [dialogProduct, setDialogProduct] = useState({});
  const handleClick = (product) => {
    setIsDialogOpen(true);
    setDialogProduct(product);
    document.body.style.overflow = "hidden";
  };
  const handleClose = () => {
    setIsDialogOpen(false);
    document.body.style.overflow = "auto";
  };
  const transitions = useTransition(isDialogOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 100 },
  });

  return (
    <>
      <MenuBar
        category={category}
        currentCategory={currentCategory}
        handleClickCategory={handleClickCategory}
      />
      <div className="py-1">{menuList}</div>
      {transitions((style, isDialogOpen) => {
        return (
          isDialogOpen && (
            <animated.div style={style}>
              <MenuDialog
                product={dialogProduct}
                handleClose={handleClose}
              />
            </animated.div>
          )
        );
      })}
    </>
  );
}
export default Menu;
