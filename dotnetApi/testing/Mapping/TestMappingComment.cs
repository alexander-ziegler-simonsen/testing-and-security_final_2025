using System.Xml.Linq;
using tradeItApi.Mapper;
using tradeItApi.Models.Data;
using tradeItApi.Models.OutputDto;

namespace testing.Mapping
{
    public class TestMappingComment
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test_CommentsToCommentOutputs()
        {
            var mapper = new CommentMapper();
            List<Comment> comments = new List<Comment>();
            comments.Add(new Comment
            {
                id = 1,
                content = "I want to buy it for 100 kr",
                fk_product_id = 1,
                fk_user_id = 1,
                _public = true
            });
            comments.Add(new Comment
            {
                id = 2,
                content = "I want to buy it for 199 kr",
                fk_product_id = 2,
                fk_user_id = 2,
                _public = false
            });


            List<CommentOutput> result = mapper.CommentListToCommentOutputList(comments);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(2));
            Assert.That(result[0].content, Is.EqualTo("I want to buy it for 100 kr"));
            Assert.That(result[1].content, Is.EqualTo("I want to buy it for 199 kr"));

            Assert.Pass("comment list to commentOutput list - works as it should");
            Assert.Fail("comment list to commentOutput list ....... it failed");
        }

        [Test]
        public void Test_OneCommentToOneCommentOutput()
        {
            var mapper = new CommentMapper();
            Comment comment = new Comment
            {
                id = 1,
                content = "I want to buy it for 100 kr",
                fk_product_id = 1,
                fk_user_id = 1,
                _public = true
            };

            CommentOutput result = mapper.CommentToCommentOutput(comment);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.id, Is.EqualTo(1));
            Assert.That(result.content, Is.EqualTo("I want to buy it for 100 kr"));
            Assert.That(result._public, Is.EqualTo(true));
            Assert.That(result.fk_user_id, Is.EqualTo(1));
            Assert.That(result.fk_product_id, Is.EqualTo(1));

            Assert.Pass("comment to commentOutput - works as it should");
            Assert.Fail("comment to commentOutput ....... it failed");
        }
    }
}
