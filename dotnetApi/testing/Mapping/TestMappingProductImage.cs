using tradeItApi.Mapper;
using tradeItApi.Models.Data;
using tradeItApi.Models.OutputDto;

namespace testing.Services
{
    public class TestMappingProductImage
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test_ProductImagesToProductImageOutputs()
        {
            var mapper = new ProductImageMapper();
            List<ProductImage> ProductImages = new List<ProductImage>();
            ProductImages.Add(new ProductImage
            {
                id = 1,
                fk_product_id = 1,
                imagepath = "1234123Image.png"
               
            });
            ProductImages.Add(new ProductImage
            {
                id = 2,
                fk_product_id = 2,
                imagepath = "61341235Image.png"
            });


            List<ProductImageOutput> result = mapper.ProductImageListToProductImageOutputList(ProductImages);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(2));
            Assert.That(result[0].imagepath, Is.EqualTo("1234123Image.png"));
            Assert.That(result[1].imagepath, Is.EqualTo("61341235Image.png"));

            Assert.Pass("ProductImage list to ProductImageOutput list - works as it should");
            Assert.Fail("ProductImage list to ProductImageOutput list ....... it failed");
        }

        [Test]
        public void Test_OneProductImageToOneProductImageOutput()
        {
            var mapper = new ProductImageMapper();
            ProductImage ProductImage = new ProductImage
            {
                id = 1,
                fk_product_id = 1,
                imagepath = "1234123Image.png"
            };

            ProductImageOutput result = mapper.ProductImageToProductImageOutput(ProductImage);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.id, Is.EqualTo(1));
            Assert.That(result.imagepath, Is.EqualTo("1234123Image.png"));
            Assert.That(result.fk_product_id, Is.EqualTo(1));

            Assert.Pass("ProductImage to ProductImageOutput - works as it should");
            Assert.Fail("ProductImage to ProductImageOutput ....... it failed");
        }
    }
}
