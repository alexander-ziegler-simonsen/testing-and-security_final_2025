using tradeItApi.Mapper;
using tradeItApi.Models.Data;
using tradeItApi.Models.OutputDto;

namespace testing.Services
{
    public class TestMappingProductCategory
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test_ProductCategorysToProductCategoryOutputs()
        {
            var mapper = new ProductCategoryMapper();
            List<ProductCategory> ProductCategorys = new List<ProductCategory>();
            ProductCategorys.Add(new ProductCategory
            {
                id = 1,
                fk_pc_parant_id = null,
                name = "cars"
            });
            ProductCategorys.Add(new ProductCategory
            {
                id = 2,
                fk_pc_parant_id = 1,
                name = "wheels"
            });


            List<ProductCategoryOutput> result = mapper.ProductCategoryListToProductCategoryOutputList(ProductCategorys);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(2));
            Assert.That(result[0].name, Is.EqualTo("cars"));
            Assert.That(result[1].name, Is.EqualTo("wheels"));

            Assert.Pass("ProductCategory list to ProductCategoryOutput list - works as it should");
            Assert.Fail("ProductCategory list to ProductCategoryOutput list ....... it failed");
        }

        [Test]
        public void Test_OneProductCategoryToOneProductCategoryOutput()
        {
            var mapper = new ProductCategoryMapper();
            ProductCategory ProductCategory = new ProductCategory
            {
                id = 2,
                fk_pc_parant_id = 1,
                name = "wheels"
            };

            ProductCategoryOutput result = mapper.ProductCategoryToProductCategoryOutput(ProductCategory);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.id, Is.EqualTo(2));
            Assert.That(result.name, Is.EqualTo("wheels"));
            Assert.That(result.fk_pc_parant_id, Is.EqualTo(1));

            Assert.Pass("ProductCategory to ProductCategoryOutput - works as it should");
            Assert.Fail("ProductCategory to ProductCategoryOutput ....... it failed");
        }
    }
}
