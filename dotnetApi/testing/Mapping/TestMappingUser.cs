using System.Reflection.Metadata;
using tradeItApi.Mapper;
using tradeItApi.Models.Data;
using tradeItApi.Models.OutputDto;

namespace testing.Mapping
{
    public class TestMappingUser
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test_UsersToUserOutputs()
        {

            DateTime testTimestramp = DateTime.Now;

            var mapper = new UserMapper();
            List<User> Users = new List<User>();
            Users.Add(new User
            {
                id = 1,
                email = "abc@abc.dk",
                firstname = "bob",
                username = "bobUsername",
                lastname = "bobsen",
                phone = "12345678",
                signedup = testTimestramp,
                hashedpassword = "12345678901234567890123456789012345678901",
                salt = "this.is.the.salt",
            });
            Users.Add(new User
            {
                id = 1,
                email = "cba@cba.dk",
                firstname = "alice",
                username = "aliceX1235",
                lastname = "Bobsen",
                phone = "87654321",
                signedup = testTimestramp,
                hashedpassword = "12345678901234567890123456789012345678902",
                salt = "that.is.the.salt",
            });


            List<UserOutput> result = mapper.UserListToUserOutputList(Users);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(2));
            Assert.That(result[0].username, Is.EqualTo("bobUsername"));
            Assert.That(result[1].username, Is.EqualTo("aliceX1235"));

            Assert.That(result[0].firstname, Is.EqualTo("bob"));
            Assert.That(result[1].firstname, Is.EqualTo("alice"));

            Assert.That(result[0].hashedpassword, Is.EqualTo("12345678901234567890123456789012345678901"));
            Assert.That(result[1].hashedpassword, Is.EqualTo("12345678901234567890123456789012345678902"));

            Assert.That(result[0].phone, Is.EqualTo("12345678"));
            Assert.That(result[1].phone, Is.EqualTo("87654321"));

            Assert.That(result[0].salt, Is.EqualTo("this.is.the.salt"));
            Assert.That(result[1].salt, Is.EqualTo("that.is.the.salt"));

            Assert.Pass("User list to UserOutput list - works as it should");
            Assert.Fail("User list to UserOutput list ....... it failed");
        }

        [Test]
        public void Test_OneUserToOneUserOutput()
        {
            DateTime testTimestramp = DateTime.Now;

            var mapper = new UserMapper();
            User User = new User
            {
                id = 1,
                email = "abc@abc.dk",
                firstname = "bob",
                username = "bobUsername",
                lastname = "bobsen",
                phone = "12345678",
                signedup = testTimestramp,
                hashedpassword = "12345678901234567890123456789012345678901",
                salt = "this.is.the.salt",
            };

            UserOutput result = mapper.UserToUserOutput(User);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.id, Is.EqualTo(1));
            Assert.That(result.username, Is.EqualTo("bobUsername"));
            Assert.That(result.firstname, Is.EqualTo("bob"));
            Assert.That(result.hashedpassword, Is.EqualTo("12345678901234567890123456789012345678901"));
            Assert.That(result.phone, Is.EqualTo("12345678"));
            Assert.That(result.salt, Is.EqualTo("this.is.the.salt"));

            Assert.Pass("User to UserOutput - works as it should");
            Assert.Fail("User to UserOutput ....... it failed");
        }
    }
}
