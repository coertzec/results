from datetime import datetime, date, time
from sqlalchemy.orm import relationship, backref
from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey
from datetime import datetime, date, time
from flask_sqlalchemy import SQLAlchemy
from server.database import Base

print("MODELS")

# class Base(Model):
#     __abstract__  = True

#     id            = Column(Integer, primary_key=True)
#     date_created  = Column(DateTime, default=datetime.utcnow())

class Event(Base): 
	__tablename__ = 'event'
	id = Column(Integer, primary_key=True)
	date_created  = Column(DateTime, default=datetime.utcnow())
	title	= Column(String(250), unique=True)
	date 	= Column(Date)
	categories = relationship("Category")
	event_stages = relationship("EventStage")

	def __init__(self, title, date): 
		self.title = title
		self.date = date 

	def as_dict(self):
		return {c.name: getattr(self, c.name) for c in self.__table__.columns}



class Category(Base):
	__tablename__ = 'category'
	id = Column(Integer, primary_key=True)
	date_created  = Column(DateTime, default=datetime.utcnow())
	name	= Column(String(250), nullable=False)
	event_id = Column(Integer, ForeignKey('event.id'))
	event = relationship('Event', backref=backref('event', lazy='dynamic'))
	category_stages = relationship("CategoryStage")
	results = relationship("Result")
    
	def __init__(self,name, event_id): 
		self.name = name
		self.event_id = event_id

class CategoryStage(Base):
	__tablename__ = 'category_stage'
	id = Column(Integer, primary_key=True)
	date_created  = Column(DateTime, default=datetime.utcnow())
	name	= Column(String(250))
	category_id = Column(Integer, ForeignKey('category.id'))
	category = relationship('Category', backref=backref('category', lazy='dynamic'))
	results = relationship("Result")

	def __init__(self, name, category_id): 
		self.name = name 
		self.category_id = category_id

class EventStage(Base):
	__tablename__ = 'event_stage'
	id = Column(Integer, primary_key=True)
	date_created  = Column(DateTime, default=datetime.utcnow())
	name	= Column(String(250))
	event_id = Column(Integer, ForeignKey('event.id'))
	event = relationship('Event', backref=backref('event_stage_event', lazy='dynamic'))
	results = relationship("Result")

	def __init__(self, name, event_id): 
		self.name = name
		self.event_id = event_id

class Participant(Base): 
	__tablename__ = 'participant'
	id = Column(Integer, primary_key=True)
	date_created  = Column(DateTime, default=datetime.utcnow())
	first_name = Column(String(250))
	last_name = Column(String(250))
	sex = Column(String(1))
	birth_date = Column(Date)

	def __init__(self, first_name, last_name, sex, birth_date): 
		self.first_name = first_name
		self.last_name = last_name
		self.sex = sex
		self.birth_date = birth_date

class Result(Base): 
	__tablename__ = 'result'
	id = Column(Integer, primary_key=True)
	date_created  = Column(DateTime, default=datetime.utcnow())
	position = Column(Integer)
	participant_id = Column(Integer, ForeignKey('participant.id'))
	participant = relationship('Participant', backref=backref('result_category', lazy='dynamic'))
	gender_position = Column(Integer)
	time = Column(Integer)
	event_stage_id = Column(Integer, ForeignKey('event_stage.id'))
	event_stage = relationship('EventStage', backref=backref('result_event_stage', lazy='dynamic'))
	category_stage_id = Column(Integer, ForeignKey('category_stage.id'))
	category_stage = relationship('CategoryStage', backref=backref('result_category_stage', lazy='dynamic'))
	category_id = Column(Integer, ForeignKey('category.id'))
	category = relationship('Category', backref=backref('result_category', lazy='dynamic'))


	def __init__(self, position, participant_id, gender_position, time, event_stage_id, category_stage_id, category_id):
		self.position = position 
		self.participant_id = participant_id
		self.gender_position = gender_position
		self.time = time 
		self.event_stage_id = event_stage_id
		self.category_stage_id = category_stage_id
		self.category_id = category_id

