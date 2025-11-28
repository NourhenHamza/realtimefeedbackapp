"""
Simple test to verify models are working correctly
"""
from app.models.events import ReactionEvent, QuestionEvent, SessionInfo, ReactionType
from datetime import datetime


def test_reaction_event():
    """Test ReactionEvent model"""
    reaction = ReactionEvent(
        reaction_type=ReactionType.SPEED_UP,
        session_id="test-session-123"
    )
    assert reaction.reaction_type == ReactionType.SPEED_UP
    assert reaction.session_id == "test-session-123"
    assert isinstance(reaction.timestamp, datetime)
    print("✓ ReactionEvent test passed")


def test_question_event():
    """Test QuestionEvent model"""
    question = QuestionEvent(
        question_text="How does this work?",
        session_id="test-session-123"
    )
    assert question.question_text == "How does this work?"
    assert question.session_id == "test-session-123"
    assert isinstance(question.timestamp, datetime)
    print("✓ QuestionEvent test passed")


def test_session_info():
    """Test SessionInfo model"""
    session = SessionInfo(session_id="test-session-123")
    assert session.session_id == "test-session-123"
    assert session.is_active is True
    assert isinstance(session.created_at, datetime)
    print("✓ SessionInfo test passed")


if __name__ == "__main__":
    test_reaction_event()
    test_question_event()
    test_session_info()
    print("\n✅ All model tests passed!")