import styled from "styled-components";
import dayjs from "dayjs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TfiLocationPin } from "react-icons/tfi";
import { TbTargetArrow } from "react-icons/tb";
import { useUserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import useTheme from "../../context/Theme";

const ServiceCard = ({ service }) => {
  const { themeMode } = useTheme();
  const date = dayjs(service?.publishedAt).format("MMM Do, YYYY");
  const { user } = useUserContext();

  // Check if the Service is published or if the current user is the creator
  if (!service?.isPublished && user?._id !== service?.createdBy) {
    return null;
  }

  return (
    <Wrapper className={themeMode === 'dark' ? 'dark' : '' }>
      <div className="card-container">
        {service?.images && service.images.length > 0 && (
          <div className="image-container">
            <img
              src={service.images[0]}
              alt="Service Image"
              className="Service-image"
            />
          </div>
        )}
      
        <div className="middle-row">
          
          <div className="card-header">
            <div className="right">
              <h4 className="company">- {service?.titre}</h4>
            </div>
          </div>
          <div className="location" title="Last Date">
            <span className="" dangerouslySetInnerHTML={{ __html: service?.description }}/>
          </div>
          {user?._id === service?.createdBy && (
            <div className="status capitalize">
              <TbTargetArrow className="mr-2 text-lg" />
              <span className={service?.isPublished ? "published" : "draft"}>
                {service?.isPublished ? "Published" : "Draft"}
              </span>
            </div>
          )}
        
          <div className="end-row">
            <Link to={`/service/${service._id}`} className="detail-btn">
              details
            </Link>
            {user?._id === service?.createdBy && (
              <Link to={`/dashboard/edit-service/${service._id}`} className="detail-btn">
                edit
              </Link>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  .card-container {
    height: 100%;
    box-shadow: 0 4px 4px var(--shadow-medium), 0 -2px 6px var(--shadow-medium);
    border-radius: 4px;
  }
  .card-container:hover {
    background-image: linear-gradient(to right bottom, #eee 0%, #f0f0f0 100%);
  }
  .image-container {
    width: 100%;
    
    height: 200px; /* Hauteur fixe pour l'image */
    margin-bottom: 1rem;
    overflow: hidden;
  }
  .Service-image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Fait en sorte que l'image remplisse le conteneur tout en conservant son rapport d'aspect */
  }
  .card-container .card-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .right .title {
    text-transform: capitalize;
    font-size: calc(15px + 0.3vw);
    font-weight: 600;
    color: var(--color-black);
    line-height: 24px;
  }
  .right .company {
    display: inline-block;
    text-transform: capitalize;
    font-size: calc(11px + 0.15vw);
    font-weight: 600;
    color: var(--color-black);
    letter-spacing: 1px;
    padding: 1px 2px;
    border-radius: 4px;
  }
  @media screen and (max-width: 550px) {
    .right .title {
      line-height: 18px;
    }
  }
  .middle-row {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: calc(0.6rem + 0.09vw);
    align-items: center;
    padding: 2rem 1.5rem;
  }
  .location,
  .type,
  .status {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
  }
  .status span {
    background-color: #fefe7d;
    padding: 2px 15px;
    border-radius: 6px;
    text-transform: uppercase;
    font-size: 12.5px;
    font-weight: 400;
    letter-spacing: 1px;
  }
  .status span.pending {
    background-color: #fefe7d;
  }
  .status span.declined {
    background-color: #feb69a;
  }
  .status span.published {
    background-color: #a0ffa3;
  }
  .end-row {
    margin-top: calc(18px + 0.4vw);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .end-row .detail-btn {
    padding: 4px 18px;
    text-transform: capitalize;
    background-color: var(--color-black);
    color: var(--color-white);
    border-radius: 4px;
    letter-spacing: 1px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s linear;
    border: none;
  }
  .end-row .detail-btn:hover {
    background-color: #5095f9;
  }
  .end-row .apply-btn {
    padding: 4px 18px;
    text-transform: capitalize;
    background-color: #5095f9;
    color: var(--color-white);
    border-radius: 4px;
    letter-spacing: 1px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s linear;
    border: none;
    outline: none;
  }
  .end-row .apply-btn:hover {
    background-color: var(--color-black);
  }
  &.dark {
    background-color: #151b25;
    color: #f9fafb;
    .end-row .detail-btn {
      background-color: #d0d2d5;
      color: var(--color-white);
    }
    .end-row .detail-btn:hover {
      background-color: #5095f9;
    }
    .end-row .apply-btn:hover {
      background-color: #d0d2d5;
    }
    .right .title {
          color: #d0d2d5;
    }
    .right .company {
      color: #d0d2d5;
    }
    .status span {
      color: #151b25;
    }
    .card-container:hover {
      background: linear-gradient(135deg, rgb(0 152 255 / 27%), rgb(255, 255, 255));
      border-radius: 10px;
      backdrop-filter: blur(10px);
  }
    }
  }
`;

export default ServiceCard;
