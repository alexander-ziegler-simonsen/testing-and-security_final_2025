using tradeItApi.Mapper;
using tradeItApi.Models.Data;
using tradeItApi.Models.OutputDto;

namespace testing.Mapping
{
    public class TestMappingProduct
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test_ProductsToProductOutputs()
        {
            var mapper = new ProductMapper();
            List<Product> Products = new List<Product>();
            Products.Add(new Product
            {
                id = 1,
                title = "iphone x123 - as new",
                description = "iphone x123, as new, only real offers please",
                fk_productcategories_id = 1,
                fk_user_id = 1,
                price = 123.12m
            });
            Products.Add(new Product
            {
                id = 2,
                title = "xbox x2 - as new",
                description = "xbox x2, as new, only real offers please",
                fk_productcategories_id = 2,
                fk_user_id = 2,
                price = 321.21m
            });


            List<ProductOutput> result = mapper.ProductListToProductOutputList(Products);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(2));
            Assert.That(result[0].title, Is.EqualTo("iphone x123 - as new"));
            Assert.That(result[1].title, Is.EqualTo("xbox x2 - as new"));

            Assert.Pass("Product list to ProductOutput list - works as it should");
            Assert.Fail("Product list to ProductOutput list ....... it failed");
        }

        [Test]
        public void Test_OneProductToOneProductOutput()
        {
            var mapper = new ProductMapper();
            Product Product = new Product
            {
                id = 1,
                title = "iphone x123 - as new",
                description = "iphone x123, as new, only real offers please",
                fk_productcategories_id = 1,
                fk_user_id = 1,
                price = 123.12m
            };

            ProductOutput result = mapper.ProductToProductOutput(Product);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.id, Is.EqualTo(1));
            Assert.That(result.title, Is.EqualTo("iphone x123 - as new"));
            Assert.That(result.price, Is.EqualTo(123.12m));
            Assert.That(result.fk_user_id, Is.EqualTo(1));
            Assert.That(result.fk_productcategories_id, Is.EqualTo(1));

            Assert.Pass("Product to ProductOutput - works as it should");
            Assert.Fail("Product to ProductOutput ....... it failed");
        }
    }
}
