import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SkeletonLoader } from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import { FaHeadset } from "react-icons/fa";
import { LuShieldCheck } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { Slider } from "6pp";
import { motion } from "framer-motion";
import videoCover from "../assets/videos/cover.mp4";

import { FaAnglesDown } from "react-icons/fa6";

const clients = [
  {
    src: "https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg",
    alt: "react",
  },
  {
    src: "https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg",
    alt: "node",
  },
  {
    src: "https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg",
    alt: "mongodb",
  },
  {
    src: "https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg",
    alt: "express",
  },
  {
    src: "https://www.vectorlogo.zone/logos/js_redux/js_redux-ar21.svg",
    alt: "redux",
  },
  {
    src: "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-ar21.svg",
    alt: "typescript",
  },
  {
    src: "https://www.vectorlogo.zone/logos/sass-lang/sass-lang-ar21.svg",
    alt: "sass",
  },
  {
    src: "https://www.vectorlogo.zone/logos/firebase/firebase-ar21.svg",
    alt: "firebase",
  },
  {
    src: "https://www.vectorlogo.zone/logos/figma/figma-ar21.svg",
    alt: "figma",
  },

  {
    src: "https://www.vectorlogo.zone/logos/github/github-ar21.svg",
    alt: "github",
  },

  {
    src: "https://www.vectorlogo.zone/logos/docker/docker-ar21.svg",
    alt: "Docker",
  },
  {
    src: "https://www.vectorlogo.zone/logos/kubernetes/kubernetes-ar21.svg",
    alt: "Kubernetes",
  },
  {
    src: "https://www.vectorlogo.zone/logos/nestjs/nestjs-ar21.svg",
    alt: "Nest.js",
  },

  {
    src: "https://www.vectorlogo.zone/logos/graphql/graphql-ar21.svg",
    alt: "GraphQL",
  },

  {
    src: "https://www.vectorlogo.zone/logos/jestjsio/jestjsio-ar21.svg",
    alt: "Jest",
  },

  {
    src: "https://www.vectorlogo.zone/logos/redis/redis-ar21.svg",
    alt: "Redis",
  },

  {
    src: "https://www.vectorlogo.zone/logos/postgresql/postgresql-ar21.svg",
    alt: "PostgreSQL",
  },
  {
    src: "https://www.vectorlogo.zone/logos/jenkins/jenkins-ar21.svg",
    alt: "Jenkins",
  },
];

const banners = [
  "https://res.cloudinary.com/daiowy5pe/image/upload/v1755169391/ticeufjqvf6napjhdiee_eochxl.png",
  "https://res.cloudinary.com/daiowy5pe/image/upload/v1755169390/rmbjpuzctjdbtt8hewaz_sahlnt.png",
];
const categories = [
  "grand",
  "Mobiles",
  "Laptops",
  "Books",
  "Fashion",
  "Appliances",
  "Furniture",
  "Home Decor",
  "Grocery",
  "Beauty",
  "Toys",
  "Fitness",
  "camera"
];

const services = [
  {
    icon: <TbTruckDelivery />,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $200",
  },
  {
    icon: <LuShieldCheck />,
    title: "SECURE PAYMENT",
    description: "100% secure payment",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 SUPPORT",
    description: "Get support 24/7",
  },
];



const Home = () => {

  const dispatch = useDispatch()

  const { data, isLoading, isError } = useLatestProductsQuery("");

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem))

    toast.success("Added To Cart")
  }

  if (isError) toast.error("Cannot fetch the Products")

  const coverMessage =
    "Fashion isn't just clothes; it's a vibrant language. Silhouettes and textures speak volumes, a conversation starter with every bold print. It's a way to tell our story, a confidence booster, or a playful exploration. From elegance to rebellion, fashion lets us navigate the world in style.".split(
      " "
    );

  return (<>
    <div className="px-[5%] py-8 flex flex-col max-w-[1920px] w-full mx-auto">
      <div className="flex p-4 gap-8 max-xl:flex-col">
        <aside className="flex flex-col gap-4 max-w-[60rem] flex-none">
          <h1 className="relative font-bold text-lg flex justify-between items-center before:content-[''] before:w-[3px] before:h-8 before:bg-black before:absolute before:-translate-x-4 max-xl:hidden">
            Categories
          </h1>
          <ul className="flex flex-col gap-2 max-xl:flex-row max-xl:overflow-x-auto max-xl:gap-6 max-xl:pb-2 max-xl:border-b max-xl:border-gray-200 max-xl:whitespace-nowrap max-xl:no-scrollbar">
            {categories.map((i) => (
              <li
                key={i}
                className="cursor-pointer flex-shrink-0 px-2 py-1 text-gray-700 hover:text-red-500 transition-colors"
              >
                <Link to={`/search?category=${i.toLowerCase()}`}>{i}</Link>
              </li>
            ))}
          </ul>

        </aside>
        <Slider autoplay autoplayDuration={3000} showNav={false} images={banners} />
      </div>

      {/* Latest Products */}
      <h1 className="font-light text-lg uppercase flex justify-between items-center mt-12">
        Latest Products
        <Link to={"/search"} className="text-sm">
          More
        </Link>
      </h1>

      <main className="w-full flex flex-wrap gap-4 max-lg:pl-6">
        {isLoading
          ? Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="h-[25rem]">
              <SkeletonLoader width="w-[18.75rem]" length={1} height="h-[20rem]" />
              <SkeletonLoader width="w-[18.75rem]" length={2} height="h-[1.95rem]" />
            </div>
          ))
          : data?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
              photos={i.photos}
            />
          ))}
      </main>
    </div>

    {/* Cover Video */}
    <article className="relative flex flex-col w-full h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />
      <video autoPlay loop muted src={videoCover} className="w-full h-full object-cover" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center z-20">
        <motion.h2 initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="text-3xl">
          Fashion
        </motion.h2>
        {coverMessage.map((el, i) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: i / 10 }}
            key={i}
            className="text-lg"
          >
            {el}{" "}
          </motion.span>
        ))}
      </div>
      <motion.span
        animate={{
          y: [0, 10, 0],
          transition: { duration: 1, repeat: Infinity },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white text-3xl"
      >
        <FaAnglesDown />
      </motion.span>
    </article>

    {/* Our Clients */}
    <article className="bg-white py-40 relative overflow-hidden">
      <div className="max-w-[1367px] mx-auto">
        <h2 className="text-2xl text-center mb-8 font-bold">Our Clients</h2>
        <div className="flex flex-wrap justify-center gap-12">
          {clients.map((client, i) => (
            <motion.img
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0, transition: { delay: i / 20, ease: "circIn" } }}
              src={client.src}
              alt={client.alt}
              key={i}
              className="h-12 w-auto hover:scale-110 transition-transform"
            />
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0, transition: { delay: clients.length / 20 } }}
          className="text-center mt-16 mb-8"
        >
          Trusted By 100+ Companies in 30+ countries
        </motion.p>
      </div>
    </article>

    <hr className="bg-black/10 border-none h-px" />

    {/* Our Services */}
    <article className="bg-white py-40 relative overflow-hidden">
      <ul className="max-w-[1367px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <motion.li
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: i / 20 } }}
            key={service.title}
            className="flex flex-col items-center text-center"
          >
            <div className="bg-black text-white rounded-full w-20 h-20 flex items-center justify-center border-[0.6rem] border-gray-400 hover:border-0 transition-all">
              {service.icon}
            </div>
            <section className="mt-4">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </section>
          </motion.li>
        ))}
      </ul>
    </article>

  </>
  )
}

export default Home