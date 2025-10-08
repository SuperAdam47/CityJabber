import Image from "next/image";

const Block1 = () => {
  return (
    <>
      <div className="col-lg-6">
        <h2 className="text-30 fw-600">About CityJabber.com</h2>
        <p className="mt-5">These greatest and top platform for the business</p>
        <p className="text-dark-1 mt-40 lg:mt-30 md:mt-20">
          Welcome to CityJabber, your ultimate local guide where the power of
          community and business converge to create an unparalleled living and
          visiting experience.
          <br />
          Founded on the unyielding belief in the transformative power of shared
          insights, we are not just a review platform - we are a movement, a
          coalition of residents and visitors committed to uplifting the
          vibrancy, service quality, and overall allure of our beloved cities.
          <br />
          Every review, recommendation, and rating on CityJabber is a vital
          stitch in the intricate tapestry of our cities narratives. We have
          embarked on a relentless journey to amplify the voices of locals and
          travelers alike, forging a dynamic community where every opinion is
          valued, and every experience, cherished.
          <br />
          Here, we celebrate diversity in thoughts and unity in purpose.
          Businesses are the backbone of our cities, painting every street and
          corner with innovation, service, and opportunity.
          <br />
          At CityJabber, we nurture an environment where businesses evolve, not
          just through profits, but through an unwavering commitment to
          excellence, inspired by real, unfiltered feedback.
          <br />
          We believe in a city where businesses don’t just thrive but are
          instrumental in weaving the societal fabric, one exceptional service
          at a time.
          <br />
          Our mission is as vivid as it is resolute – to cultivate a community
          where every member is a stakeholder in its greatness, and every
          business, a catalyst for impeccable service.
          <br />
          At CityJabber, we’re not just about reviews; we’re about
          revolutionizing our cityscape through shared stories, combined
          efforts, and the indomitable spirit of togetherness.
          <br />
          Join us in this exhilarating journey, for it’s not just about making a
          city liveable, but memorable, not just about reviews, but revelations.
          Together, let’s script a saga of a city that’s not just seen but felt,
          not just visited but experienced.
          <br />
          Welcome to CityJabber, where every voice counts, every business
          matters, and every member is a co-author of the city’s narrative.
          <br />
          Be part of CityJabber – Where Community and Business Bloom!
          <br />
        </p>
      </div>
      {/* End .col */}

      <div className="col-lg-5">
        <Image
          width={400}
          height={400}
          src="/img/pages/about/dennisandbecca.jpeg"
          alt="image"
          className="rounded-4 w-100"
        />
      </div>
      {/* End .col */}
    </>
  );
};

export default Block1;
