using tradeItApi.Mapper;
using tradeItApi.Models.Data;
using tradeItApi.Models.OutputDto;

namespace testing.Mapping
{
    public class TestMappingProductFavorite
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test_ProductFavoritesToProductFavoriteOutputs()
        {
            var mapper = new ProductFavoriteMapper();
            List<ProductFavorite> ProductFavorites = new List<ProductFavorite>();
            ProductFavorites.Add(new ProductFavorite
            {
                id = 1,
                fk_product_id = 1,
                fk_user_id = 1
             
            });
            ProductFavorites.Add(new ProductFavorite
            {
                id = 2,
                fk_product_id = 2,
                fk_user_id = 1
            });


            List<ProductFavoriteOutput> result = mapper.ProductFavoriteListToProductFavoriteOutputList(ProductFavorites);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(2));
            Assert.That(result[0].id, Is.EqualTo(1));
            Assert.That(result[1].id, Is.EqualTo(2));

            Assert.Pass("ProductFavorite list to ProductFavoriteOutput list - works as it should");
            Assert.Fail("ProductFavorite list to ProductFavoriteOutput list ....... it failed");
        }

        [Test]
        public void Test_OneProductFavoriteToOneProductFavoriteOutput()
        {
            var mapper = new ProductFavoriteMapper();
            ProductFavorite ProductFavorite = new ProductFavorite
            {
                id = 1,
                fk_product_id = 1,
                fk_user_id = 1
            };

            ProductFavoriteOutput result = mapper.ProductFavoriteToProductFavoriteOutput(ProductFavorite);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.id, Is.EqualTo(1));
            Assert.That(result.fk_user_id, Is.EqualTo(1));
            Assert.That(result.fk_product_id, Is.EqualTo(1));

            Assert.Pass("ProductFavorite to ProductFavoriteOutput - works as it should");
            Assert.Fail("ProductFavorite to ProductFavoriteOutput ....... it failed");
        }
    }
}
