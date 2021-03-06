import { Carousel } from 'react-bootstrap'
const ImageCarousel = ({game}) => {
    return (           
    <Carousel style={{ maxHeight: "500px" }}>
    {game.imageList.map((image, index) => {
        return (
            <Carousel.Item style={{ maxHeight: "500px" }} key={index}>
                <img
                    style={{ width: "100%", height: "500px", objectFit: "contain" }}
                    src={image}

                    alt="Game Image" />
            </Carousel.Item>
        )
    })}
</Carousel> );
}
 
export default ImageCarousel;