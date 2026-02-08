using tradeItApi.Models.OutputDto;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.Data;
using Riok.Mapperly.Abstractions;

namespace tradeItApi.Mapper;

[Mapper]
public partial class CommentMapper
{
    public partial CommentOutput CommentToCommentOutput(Comment comment);
    public partial Comment CommentInputToComment(CommentInput comment);

    public partial List<CommentOutput> CommentListToCommentOutputList(List<Comment> comments);
}