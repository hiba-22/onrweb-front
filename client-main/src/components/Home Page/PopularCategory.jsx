import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import useTheme from "../../context/Theme";
const PopularCategory = () => {
  const { themeMode } = useTheme();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch job type data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get("https://onr-backend.vercel.app/api/v1/Jobs/info");
        const data = response.data;

        // Update the categories array with the fetched data
        setCategories([
          { id: 1, name: "CDD", count: data.CDD },
          { id: 2, name: "CDI", count: data.CDI },
          { id: 3, name: "Internship", count: data.INTERNSHIP },
          { id: 4, name: "Freelance", count: data.FREELANCE }
        ]);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter out categories with a count of 0
  const filteredCategories = categories.filter(category => category.count > 0);

  return (
    <Wrapper className={themeMode === 'dark' ? 'dark' : '' }>
    <div className="max-w-7xl mx-auto md:px-12 px-6 mb-20">
      <h2 className="md:text-3xl text-2xl font-semibold mb-5">Most Vacancies</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {filteredCategories.map(({ name, id, count }) => (
          <div key={id}>
            <p className="text-lg text-[#18191C] text-dark dark:text-white">{name}</p>
            <p className="text-sm text-[#767F8C] dark:text-gray-400">{`${count} Open Positions`}</p>
          </div>
        ))}
      </div>
    </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
    padding: 2rem 1.5rem;
    width: 100%;

    margin: 0 auto;
    &.dark {
        background-color: #1f2937;
        color: #f9fafb;
    }
`;
export default PopularCategory;
