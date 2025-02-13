import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import MenuBar from "./MenuBar";
import MenuDialog from "./MenuDialog";
import { apiGetmtl } from "../../api";
import img1 from "../../assets/item1.jpeg";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { useQuery, gql } from "@apollo/client";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

Menu.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  setIsDialogOpen: PropTypes.func.isRequired,
  dialogProduct: PropTypes.object.isRequired,
  setDialogProduct: PropTypes.func.isRequired,
};

function Menu({ isDialogOpen, setIsDialogOpen, dialogProduct, setDialogProduct }) {
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
    if (error)
      throw new Response("發生錯誤", { status: 404, statusText: error });
    if (data) {
      setMenu(data.getMenu[0].categories);
    }
  }, [data]);

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
                <span className=" font-medium text-lg text-left">
                  {item.productDisplayName}
                </span>
                <span className=" font-normal text-sm text-left">
                  {itemInfo}
                </span>
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
              node: node,
            });
          } else {
            map.delete(item.categoryName);
          }
        }}
      >
        <div className="my-1 flex items-baseline gap-2 ">
          <span className=" text-2xl font-medium">
            {item.categoryDisplayName}
          </span>
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
    // const category = menu.map((item) => {
    //   return {
    //     category: item.category,
    //     categoryName: item.categoryName,
    //   };
    // });
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
  const isInViewPortRef = useRef(new Map());
  const observer = new IntersectionObserver((entries) => {
    function handleCurrentCategory() {
      // find the last category in viewport and set it as current category
      const newArray = Array.from(isInViewPortRef.current);
      let newCategory = newArray.findLast((item) => item[1] === true)[0];
      const newCurrentCategory = category.find(
        (item) => item.keyName === newCategory
      );
      setCurrentCategory(newCurrentCategory);
    }
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // if the element is in viewport or entering the viewport
        const targetCategory = entry.target.attributes["data-category"].value;
        isInViewPortRef.current.set(targetCategory, true);
        handleCurrentCategory();
      } else {
        // if the element is not in viewport or leaving the viewport
        const targetCategory = entry.target.attributes["data-category"].value;
        isInViewPortRef.current.set(targetCategory, false);
        handleCurrentCategory();
      }
    });
  });
  const handleClick = (product) => {
    setIsDialogOpen(true);
    setDialogProduct(product);
    document.body.style.overflow = "hidden";
  };


  if (!data) return <Skeleton count={4} className="h-12 line-clamp-6" />;
  return (
    <>
      <MenuBar
        category={category}
        currentCategory={currentCategory}
        handleClickCategory={handleClickCategory}
      />
      <div className="py-1">{menuList}</div>
      
    </>
  );
}
export default Menu;
