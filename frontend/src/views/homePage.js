import UserInfo from "../components/UserInfo";

const Home = () => {
  return (
    <section>
      {"admin" && <UserInfo user={"admin"} />}
      <h1>You are on home page!</h1>
    </section>
  );
};

export default Home;
