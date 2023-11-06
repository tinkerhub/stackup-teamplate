use std::{slice::Iter, str::FromStr};

pub trait PairExt {
    fn next_field<T>(&mut self) -> T
    where
        T: FromStr,
        <T as FromStr>::Err: std::fmt::Debug;
}

impl PairExt for Iter<'_, (&str, Option<&str>)> {
    fn next_field<T>(&mut self) -> T
    where
        T: FromStr,
        <T as FromStr>::Err: std::fmt::Debug,
    {
        match self
            .next()
            .expect("should exist")
            .1
            .expect("should be not null")
            .parse()
        {
            Ok(value) => value,
            Err(e) => {
                println!("{e:?}");
                panic!();
            }
        }
        // .expect("Should parse")
    }
}
