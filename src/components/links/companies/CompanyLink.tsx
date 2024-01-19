import { Button } from "antd";
import { Link } from "react-router-dom";
import './CompanyLink.css'

export interface Props {
  name: string;
  url: string;
  isActive: boolean;
}

export const CompanyLink = ({ name, url, isActive }: Props) => {
  return (
    <Link to={url}>
      <Button className="company_link_button" type="primary" shape="circle" disabled={!isActive}>
        {name}
      </Button>
    </Link>
  );
};

