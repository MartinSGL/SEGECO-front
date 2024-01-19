import { Loader, CompanyLink } from "../../components";
import { useCompanies } from "./useCompanies";
import "./Companies.css";

const Companies = () => {
  
  const { companies, isLoading } = useCompanies()

  return (
    <>
      <Loader show={isLoading} />
      <div className="companies_link_container">
        {companies.length > 0 &&
          companies.map(({ _id, name, isActive }) => (
            <CompanyLink
              key={_id}
              isActive={isActive}
              name={name}
              url={`./${name}`}
            />
          ))}
      </div>
    </>
  );
};

export default Companies;
